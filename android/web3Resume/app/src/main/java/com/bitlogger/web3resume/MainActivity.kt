package com.bitlogger.web3resume

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.bitlogger.web3resume.databinding.ActivityMainBinding
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    private lateinit var mainBinding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mainBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(mainBinding.root)

        mainBinding.signInInstitute.setOnClickListener{
            val intent = Intent(this, InstituteSignUp::class.java)
            overridePendingTransition(R.anim.slide_out, R.anim.slide_in)
            startActivity(intent)
        }
        mainBinding.signInUser.setOnClickListener{
            val intent = Intent(this, UserSignUp::class.java)
            overridePendingTransition(R.anim.slide_out, R.anim.slide_in)
            startActivity(intent)
        }
    }
}