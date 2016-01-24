package notrino.gcm_android.utils;

import android.content.Context;
import android.os.AsyncTask;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.google.android.gms.gcm.GoogleCloudMessaging;
import com.google.android.gms.iid.InstanceID;

import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import notrino.gcm_android.controllers.AppController;
import notrino.gcm_android.models.Constants;
import notrino.gcm_android.models.DataRequest;

/**
 * Created by david_000 on 1/19/2016.
 */
public class ApiManager {

    /** The current application context. (Used for AWS) */
    private Context context;

    public ApiManager(Context context) {
        this.context = context;
    }

    /** A nested Asynchronous Task class for getting GCM registration tokens. */
    private class ReqTask extends AsyncTask<String, String, String> {

        public String regToken;
        public String password;
        public String email;

        @Override
        protected String doInBackground(String... strings) {
            password = strings[0];
            email = strings[1];
            InstanceID instanceID = InstanceID.getInstance(context);
            try {
                regToken = instanceID.getToken(Constants.SENDER_ID, GoogleCloudMessaging.INSTANCE_ID_SCOPE, null);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }

        protected void onPostExecute(String result) {
            HashMap<String, String> params = new HashMap<>();
            params.put("password", password);
            params.put("email", email);
            params.put("reg_token", regToken);
            DataRequest request = new DataRequest(Request.Method.POST, null, params, Constants.CREATE_USER_API, new Response.Listener() {
                @Override
                public void onResponse(Object o) {
                    System.out.println("Success!");
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError volleyError) {
                    System.out.println(volleyError);
                }
            });
            AppController.getInstance().addToRequestQueue(request);
        }
    }

    /** Create a new user. (Happens when onboarding). */
    public void createUser(ArrayList<String> parameters) {
        String username = parameters.get(0);
        String email = parameters.get(1);
        new ReqTask().execute(username, email);
    }

    /** Update the user. */
    public void authUser(final ArrayList<String> parameters) {
        AsyncTask<Void, Void, Void> asyncTask = new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... voids) {
                String regToken = "";
                final String[] user_id = {""};
                InstanceID instanceID = InstanceID.getInstance(context);
                try {
                    regToken = instanceID.getToken(Constants.SENDER_ID, GoogleCloudMessaging.INSTANCE_ID_SCOPE, null);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                final String finalRegToken = regToken;
                StringRequest postRequest = new StringRequest(Request.Method.POST, Constants.LOGIN_USER_API, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String s) {
                        updateUser(s, finalRegToken);
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError volleyError) {
                        System.out.println(volleyError);
                    }
                }) {
                    @Override
                    protected Map<String, String> getParams() {
                        Map<String, String> params = new HashMap<>();
                        params.put("password", parameters.get(0));
                        params.put("email", parameters.get(1));
                        return params;
                    }
                };
                AppController.getInstance().addToRequestQueue(postRequest);
                return null;
            }
        }.execute();
    }

    public void updateUser(String user_id, String regToken) {
        HashMap<String, String> newParams = new HashMap<>();
        System.out.println("userid: " + user_id);
        newParams.put("user_id", user_id);
        newParams.put("reg_token", regToken);
        DataRequest updateRequest = new DataRequest(Request.Method.POST, null, newParams, Constants.UPDATE_USER_API, new Response.Listener() {
            @Override
            public void onResponse(Object o) {
                System.out.println(o);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                System.out.println(volleyError);
            }
        });
        AppController.getInstance().addToRequestQueue(updateRequest);
    }
}
