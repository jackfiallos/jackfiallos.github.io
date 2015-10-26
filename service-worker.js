self.addEventListener('push', function(event) {
    console.log('Received a push message', event);

    var title = 'GCM from Jack';
    var body = 'This can be a personalized message sent from your server :D';
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
