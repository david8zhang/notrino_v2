package notrino.gcm_android.views.activities;

import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import notrino.gcm_android.R;
import notrino.gcm_android.views.adapter.ViewPagerAdapter;
import notrino.gcm_android.views.fragment.UserActivityFragment;

/**
 * Created by david_000 on 4/30/2016.
 */
public class ProfileActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        /* setSupportActionBar toolbar. */
        Toolbar toolbar = (Toolbar)findViewById(R.id.tabanim_toolbar);
        setSupportActionBar(toolbar);
        toolbar.setContentInsetsAbsolute(0, 0);

        /* Viewpager */
        final ViewPager viewPager = (ViewPager)findViewById(R.id.tabainm_viewpager);
        setupViewPager(viewPager);

        TabLayout tabLayout = (TabLayout)findViewById(R.id.tabanim_tabs);
        tabLayout.setupWithViewPager(viewPager);

        tabLayout.setOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                viewPager.setCurrentItem(tab.getPosition());

                switch(tab.getPosition()) {
                    case 0:
                        System.out.println("One");
                        break;
                    case 1:
                        System.out.println("Two");
                        break;
                    case 2:
                        System.out.println("Three");
                        break;
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });
    }

    private void setupViewPager(ViewPager viewPager) {
        ViewPagerAdapter adapter = new ViewPagerAdapter(getSupportFragmentManager(), this);
        adapter.addFrag(new UserActivityFragment(), "Fragment 1");
        adapter.addFrag(new UserActivityFragment(), "Fragment 2");
        viewPager.setAdapter(adapter);
    }
}
