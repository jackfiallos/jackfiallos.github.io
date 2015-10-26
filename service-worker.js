self.addEventListener('push', function(event) {
    console.log('Received a push message', event);

    var title = 'GCM Jackfiallos';
    var body = 'Contenido breve de la notificación push';
    var icon = '/google-logo.jpg';
    var tag = 'push tag test jack';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
    );
});
