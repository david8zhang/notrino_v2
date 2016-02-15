package notrino.gcm_android.controllers.service;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;

import com.google.android.gms.gcm.GcmListenerService;

import notrino.gcm_android.R;
import notrino.gcm_android.models.DataModelManager;
import notrino.gcm_android.views.activities.MainActivity;
import notrino.gcm_android.views.activities.SubscribeActivity;


/**
 * Created by david_000 on 1/26/2016.
 */
public class MyGcmListenerService extends GcmListenerService {

    private static final String TAG = "MyGcmListenerService";

    @Override
    public void onMessageReceived(String from, Bundle data) {
        System.out.println("Message:" + data);
        System.out.println("type: " + data.getString("type"));
        sendNotification(data.getString("type"));

        /** Set the question pool id and the user_id id. */
        if(data.getString("type").equals("subscribe")) {
            DataModelManager.setQpoolId(data.getString("qpool_id"));
            DataModelManager.setUserId(data.getString("user_id"));
        }
    }

    /** Show a toast, change this to a notification later. */
    private void sendNotification(String label) {
        String message = "";
        if(label.equals("subscribe")) {
            message = "Click to subscribe!";
        } else if(label.equals("new")) {
            message = "A new question has arrived!";
        }
        Intent subscribeIntent = new Intent(this, SubscribeActivity.class);
        subscribeIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0 /* Request code */, subscribeIntent,
                PendingIntent.FLAG_ONE_SHOT);

        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.cast_ic_notification_2)
                .setContentTitle("notrino")
                .setContentText(message)
                .setAutoCancel(true)
                .setSound(defaultSoundUri)
                .setContentIntent(pendingIntent);

        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        notificationManager.notify(0 /* ID of notification */, notificationBuilder.build());
    }
}
