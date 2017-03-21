import _reduce from 'lodash/reduce';
import _map from 'lodash/map';
const API_URL = 'https://api.spotify.com/v1/search';
const ARTIST_URL = 'https://api.spotify.com/v1/artists/{id}/albums';
const ERROR_MSG = 'Something went wrong, there was some error while loading the content';

class SpotifyService {
    
    constructor($http, $q) {           
        this.data = [];
        this.$http = $http;
        this.$q = $q;
        this.status = {
            inProgress: false
        };
    
    }

    //Searching Albums and Artists based on the search term and offset limit
    search(q, offset=0) {
        let deferred = this.$q.defer();
        this.status.inProgress = true;
        //get the results and 
        this.$http({
            url: API_URL,
            method: 'GET',
            params: {
                q: q,
                type: 'artist,album',
                limit: 5,
                offset: offset
            }
        })
        .then((res) => {  //success                   
            var items = this.mergeData(res.data.artists.items, res.data.albums.items);
            items = this.prepareData(items);            
            deferred.resolve({
                items: items,
                totalArtists: res.data.artists.total,
                totalAlbums: res.data.albums.total
            });
            this.status.inProgress = false;
          }, (res) => { //error
            deferred.reject({
                error: res.data
            });
            this.status.inProgress = false;
        })

        return deferred.promise;
    }

    searchArtist(id, offset=0) {
        let deferred = this.$q.defer();
        let _url = ARTIST_URL.replace('{id}', id);

        this.status.inProgress = true;
        this.$http({
            url: _url,
            method: 'GET',
            params: {
                limit: 40,
                offset: offset
            }
        })
        .then((res) => {            
            let items = this.prepareData(res.data.items);            
            deferred.resolve({
                items: items,
                total: res.data.total
            });
            this.status.inProgress = false;
        }, (res) => {
            deferred.reject({
                error: ERROR_MSG
            });
            this.status.inProgress = false;
        });

        return deferred.promise;
    }

    //Merge albums and artists one by one like deck of cards
    mergeData(artists, albums) {
        var result = _reduce(artists.length < albums.length? albums: artists, function(res, _, i) {
                if(i < artists.length) res.push(artists[i]);
                if(i < albums.length) res.push(albums[i]);
                return res;
            }, []);            
        return result;

    }

    // remove out extra information which is not required
    prepareData(data) {        
        var results = _map(data, (item) => {
            return {
                id: item.id,
                name: item.name,
                type: item.type,
                img: item.images.length > 0 ? item.images[0] : null
            }
        });
        return results;
    }
  
}

export default SpotifyService;
