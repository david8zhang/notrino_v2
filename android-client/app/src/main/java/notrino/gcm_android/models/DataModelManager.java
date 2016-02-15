package notrino.gcm_android.models;

/**
 * Created by david_000 on 1/26/2016.
 */
public class DataModelManager {

    public static DataModelManager instance;

    public static String regToken;
    public static String user_id;
    public static String qpool_id;

    /** Get the instance of the DataModelManager. */
    public static DataModelManager getInstance() {
        return instance;
    }

    /** Set the registration token for GCM. */
    public static void setRegToken(String token) {
        regToken = token;
    }

    /** Set the user_id from the subscribe handshake. */
    public static void setUserId(String id) { user_id = id; }

    /** Set the qpool_id to qpoolId. */
    public static void setQpoolId(String qpoolId) { qpool_id = qpoolId; }
}
