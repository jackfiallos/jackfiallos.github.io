if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://jackfiallos.github.io/web-push-notifications/js/service-worker.js').then(function(){
        
        console.info("El servicio se ha registrado");

        // service worker ?
        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
            console.warn('Las notificaciones no son soportadas');
            return;
        }

        // Permissions check
        if (Notification.permission === 'denied') {
            console.warn('El usuario ha bloqueado las notificaciones');
            return;
        }

        // Push messaging supported
        if (!('PushManager' in window)) {
            console.warn('La mensajería push no es soportada');
            return;
        }

        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.getSubscription().then(
                function(subscription) {
                    if (!subscription) {
                        console.log(subscription);
                    return;
                    }
                    else {
                        console.log(subscription);
                    }
                }
            ).catch(function(err) {
                console.warn('Error durante getSubscription()', err);
            });

            serviceWorkerRegistration.pushManager.subscribe().then(
                function(pushSubscription) {
                    console.log(pushSubscription);
                }, function(error) {
                    console.log(error);
                }
            ).catch(function(err) {
                console.warn('Error durante la suscription', err);
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
