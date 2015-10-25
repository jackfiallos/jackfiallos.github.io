if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://jackfiallos.github.io/web-push-notifications/js/service-worker.js').then(function(registration) {
        
        console.info("El servicio se ha registrado", registration);

        // service worker ?
        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
            console.warn('Las notificaciones no son soportadas');
            return;
        }

        // Check the current Notification permission.  
        // If its denied, it's a permanent block until the  
        // user changes the permission  
        if (Notification.permission === 'denied') {  
            console.warn('Las notificaciones han sido bloqueadas por el usuario');  
            return;  
        }

        // Push messaging supported
        if (!('PushManager' in window)) {
            console.warn('La mensajería push no es soportada');
            return;
        }

        // We need the service worker registration to check for a subscription  
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            // Do we already have a push message subscription?
            serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription) {
                // We aren't subscribed to push,
                if (!subscription) {
                    return;
                }

                console.log(subscription);

            }).catch(function(err) {
                console.warn('Error durante getSubscription()', err);
            });

            // process the permission request
            serviceWorkerRegistration.pushManager.subscribe().then(function(subscription) {
                console.log(subscription);
            }).catch(function(err) {
                console.warn('Error durante la suscription', err);
                if (Notification.permission === 'denied') {  
                    // The user denied the notification permission 
                    console.warn('Permission for Notifications was denied');  
                } else {  
                    // A problem occurred with the subscription; common reasons  
                    // include network errors, and lacking gcm_sender_id and/or  
                    // gcm_user_visible_only in the manifest.  
                    console.error('Unable to subscribe to push.', e);  
                }
            });
        }).catch(function(err) {
            console.warn('Error durante el inicio', err);
        });
    }).catch(function(err) {
        console.warn('Error durante el registro', err);
    });
} else {
    console.warn('Los Service workers no están soportados en este navegador.');
}
