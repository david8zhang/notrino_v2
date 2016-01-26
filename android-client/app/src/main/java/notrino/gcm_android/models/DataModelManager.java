package notrino.gcm_android.models;

/**
 * Created by david_000 on 1/26/2016.
 */
public class DataModelManager {

    public static String regToken;

    /** Set the registration token for GCM. */
    public static void setRegToken(String token) {
        regToken = token;
    }
}
