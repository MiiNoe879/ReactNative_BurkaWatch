var axios = require('axios');
var API_URL = "https://burka-dev.qmax.us";
//var API_URL = "http://192.168.1.46:8000";
var helpers = {
  signup: function(phonenumber){
    return axios.post(API_URL+'/api/user/signup', {
        phonenumber: phonenumber
      })
  },
  login: function(phonenumber, pincode){
    return axios.post(API_URL+'/api/user/login', {
        phonenumber: phonenumber,
        pincode: pincode
      })
  },
  getuserinfo: function(token){
    return axios.get(API_URL+'/api/user/get', {
        headers: {'token': token}
    })
  },
  updateuserinfo: function(token,nickname){
    return axios.put(API_URL+'/api/user/update', {nickname:nickname},{
        headers: {'token': token}
    })
  },
  getLeaderboard: function(token,count_per_page=10,page=1){
    return axios.get(API_URL+'/api/user/leaderboard?count_per_page='+count_per_page+'&page='+page,{
      headers: {'token': token}
    })
  },
  getLatestImages: function(token,count_per_page=10,page=1){
    return axios.get(API_URL+'/api/image/latest?count_per_page='+count_per_page+'&page='+page,{
      headers: {'token': token}
    })
  },
  getUserImages: function(token,count_per_page=10,page=1){
    return axios.get(API_URL+'/api/image/get_user_images?count_per_page='+count_per_page+'&page='+page,{
      headers: {'token': token}
    })
  },
  getBurkaDetail: function(token,id){
    return axios.get(API_URL+'/api/image/'+id,{
      headers: {'token': token}
    })
  },
  removeImage: function(token,id){
    return axios.delete(API_URL+'/api/image/'+id,{
      headers: {'token': token}
    })
  },
  updateImage: function(token,image){
    return axios.put(API_URL+'/api/image/'+image.id,
      {
        description: image.description,
        location: image.location,
        lat: image.lat,
        lon: image.lon
      },
      {
        headers: {'token': token}
      }
    )
  },
  reportImage: function(token,id,reason){
    return axios.post(API_URL+'/api/report',
      {
        image_id: id,
        reason: reason
      },
      {
        headers: {'token': token}
      }
    )
  },
  saveImage: function(token,description,location,lat,lon,s3_path){
    return axios.post(API_URL+'/api/image/store',
      {
        description: description,
        location: location,
        lat: lat,
        lon: lon,
        s3_path: s3_path
      },
      {
        headers: {'token': token}
      }
    )
  },
  uploadRequest: function(token,filename){
    return axios.post(API_URL+'/api/image/uploadrequest',
      {
        filename: filename
      },
      {
        headers: {'token': token}
      }
    )
  },
  fileUpload: function(url, file){
    return axios.put(url,
      JSON.stringify(file),
      {
        headers: {'Content-Type' : 'image/jpeg'}
      }
    )
  },
  getAllImages: function(token){
    return axios.get(API_URL+'/api/image/all',
      {
        headers: {'token' : token}
      }
    )
  }
}

module.exports = helpers;