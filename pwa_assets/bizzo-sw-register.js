(function(){
    if('serviceWorker' in navigator){
        window.addEventListener('load',function(event){
            navigator.serviceWorker.register('bizzo-sw.js')
                .then(function(registration){
                    console.debug(registration);
                }).catch(function(error){
                    console.error('Error while registering service worker', error);
                });
        });
    }
}());