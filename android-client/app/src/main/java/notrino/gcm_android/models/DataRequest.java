package notrino.gcm_android.models;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.ParseError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.toolbox.HttpHeaderParser;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by david_000 on 1/19/2016.
 */
public class DataRequest extends Request {

    private HashMap<String, String> mParams;
    private HashMap<String, String> mHeaders;
    private Response.Listener mListener;

    public DataRequest(int method, HashMap<String, String> headers, HashMap<String, String> params, String url, Response.Listener listener, Response.ErrorListener errorListener) {
        super(method, url, errorListener);
        mListener = listener;
        mParams = params;
        mHeaders = headers;
    }

    /** Returns headers specified by those in constructor. */
    @Override
    public Map<String, String> getHeaders() throws AuthFailureError {
        return mHeaders != null ? mHeaders : super.getHeaders();
    }

    /** Returns parameters specified by those in constructor. */
    @Override
    public Map<String, String> getParams() throws AuthFailureError {
        return mParams != null ? mParams: super.getParams();
    }

    @Override
    protected Response parseNetworkResponse(NetworkResponse networkResponse) {
        try {
            String json = new String(
                    networkResponse.data,
                    HttpHeaderParser.parseCharset(networkResponse.headers));
            return Response.success(
                    json,
                    HttpHeaderParser.parseCacheHeaders(networkResponse)
            );
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return Response.error(new ParseError(e));
        }
    }

    @Override
    protected void deliverResponse(Object o) {
        mListener.onResponse(o);
    }

    @Override
    public int compareTo(Object o) {
        return 0;
    }
}
