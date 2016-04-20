package notrino.gcm_android.views.activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.HashMap;

import notrino.gcm_android.R;
import notrino.gcm_android.utils.ApiManager;

/**
 * Created by david_000 on 1/19/2016.
 */
public class LoginActivity extends AppCompatActivity{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        final ApiManager api = new ApiManager(this);

        final TextView emailView = (TextView)findViewById(R.id.email);
        final TextView passView = (TextView)findViewById(R.id.password);

        Button createAcc = (Button)findViewById(R.id.create_user);
        createAcc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String email = emailView.getText().toString();
                String password = passView.getText().toString();

                ArrayList<String> params = new ArrayList<>();
                params.add(password);
                params.add(email);
                api.createUser(params);
            }
        });

        Button login = (Button)findViewById(R.id.login);
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String email = emailView.getText().toString();
                String password = passView.getText().toString();

                ArrayList<String> params = new ArrayList<>();
                params.add(password);
                params.add(email);
                api.authUser(params);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
