package notrino.gcm_android.views.activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import notrino.gcm_android.R;
import notrino.gcm_android.models.DataModelManager;
import notrino.gcm_android.utils.ApiManager;

/**
 * Created by david_000 on 2/15/2016.
 */
public class SubscribeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_subscribe);

        /** Subscribe handshake. */
        ApiManager api = new ApiManager(this);
        String qpool_id = DataModelManager.qpool_id;
        String user_id = DataModelManager.user_id;
        api.subscribeQPool(user_id, qpool_id);
    }
}
