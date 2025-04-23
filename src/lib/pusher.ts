import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

declare global {
    const pusherServerInstance: PusherServer | undefined;
    const pusherClientInstance: PusherClient | undefined;
}

if (!global.pusherServerInstance){
    global.pusherServerInstance = new PusherServer({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: 'ap1',
        useTLS: true
    })
}