package notrino.gcm_android.views.fragment;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import notrino.gcm_android.R;

/**
 * Created by david_000 on 5/8/2016.
 */
public class UserActivityFragment extends Fragment {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.user_activity_fragment, container, false);
        TextView textView = (TextView)view.findViewById(R.id.sample_text);
        textView.setText("Fragment");
        return view;
    }

}
