package notrino.gcm_android.controllers.service;

import android.os.Bundle;
import android.support.v7.app.NotificationCompat;

import com.google.android.gms.gcm.GcmListenerService;


/**
 * Created by david_000 on 1/26/2016.
 */
public class MyGcmListenerService extends GcmListenerService {

    private static final String TAG = "MyGcmListenerService";

    @Override
    public void onMessageReceived(String from, Bundle data) {
        String message = data.getString("message");
        sendNotification(message);
    }

    /** Show a toast, change this to a notification later. */
    private void sendNotification(String message) {
    }
}
