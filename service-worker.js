self.addEventListener('push', function(event) {
    console.log('Received a push message', event);

    var title = 'Prueba de mensajería';
    var body = 'Este podría ser el mensaje que se envía a los clientes suscritos :)';
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
