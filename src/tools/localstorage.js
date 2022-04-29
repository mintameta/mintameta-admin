const  STORAGE_KEY = 'app'
export default{
   fetch(key=STORAGE_KEY){
      return JSON.parse(window.localStorage.getItem(key) || false)
   },
   save(key=STORAGE_KEY,items){
    // window.sessionStorage.removeItem(key);
    window.localStorage.setItem(key,JSON.stringify(items));
   }
}
