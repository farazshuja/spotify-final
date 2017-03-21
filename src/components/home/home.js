import _concat from 'lodash/concat';

class Home {
  constructor($routeParams, $location, SpotifyService) {         
    this.search = '';
    this.noResult = false;
    this.results = {
      items: [],
      totalAlbums: 0,
      totalArtists: 0,
      hasMore: false
    };
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.SpotifyService = SpotifyService;
        
  }

  searchIt() {      
      this.SpotifyService.search(this.search)
        .then((res) => {          
          if(!res.error) {
            this.results = res;
            this.results.hasMore = this.hasMoreRecords();            
            this.noResult = this.results.items.length == 0;
          }
        })
  }

  hasMoreRecords() {    
    return this.results.items.length < (this.results.totalAlbums + this.results.totalArtists);
  }

  loadNewResults() {    
    let len = this.results.items.length;
    this.SpotifyService.search(this.search, len)
        .then((res) => {          
          if(!res.error) {
            this.results.items = [...this.results.items, ...res.items]            
          }
        });
  }
}

export default Home;
