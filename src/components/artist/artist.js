import _concat from 'lodash/concat';

class Artist {
  constructor($routeParams, SpotifyService, Albums) {                 

    this.id = $routeParams.id;
    this.results = Albums;        
    this.SpotifyService = SpotifyService;
        
  }
  

  hasMoreRecords() {    
    return this.results.items.length < this.results.total;
  }

  loadNewResults() {
    let len = this.results.items.length;
    this.SpotifyService.searchArtist(this.id, len)
        .then((res) => {          
          if(!res.error) {
            this.results.items = [...this.results.items, ...res.items]            
          }
        });
  }
}

export default Artist;
