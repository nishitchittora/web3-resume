package com.bitlogger.web3resume

import android.content.Intent
import android.graphics.drawable.Drawable
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.swiperefreshlayout.widget.CircularProgressDrawable
import com.bitlogger.web3resume.databinding.ActivityInstituteSignUpBinding
import com.google.android.material.button.MaterialButton

class InstituteSignUp : AppCompatActivity() {
    private lateinit var binding: ActivityInstituteSignUpBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInstituteSignUpBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val callback = object :BlockCallback {
            override fun isLoading(boolean: Boolean) {
                runOnUiThread{
                    binding.signUpInstitute.setShowProgress(boolean)
                }
            }

            override fun success(data: Any?) {
                val intent = Intent(this@InstituteSignUp, InstituteMint::class.java)
                overridePendingTransition(R.anim.slide_out, R.anim.slide_in)
                startActivity(intent)
            }

            override fun error(message: String) {
                Toast.makeText(this@InstituteSignUp, message, Toast.LENGTH_SHORT).show()
            }
        }

        binding.signUpInstitute.setOnClickListener {
            if (binding.instituteName.text.toString().isEmpty()) {
                binding.instituteName.error = "Enter Name"
                return@setOnClickListener
            }else if (binding.instituteDescription.text.toString().isEmpty()) {
                binding.instituteDescription.error = "Enter Description"
                return@setOnClickListener
            }else if (binding.instituteWalletId.text.toString().isEmpty()) {
                binding.instituteWalletId.error = "Enter Wallet id"
                return@setOnClickListener
            }else {
//                ContractBuilder().addInstitute(
//                    binding.instituteName.text.toString(),
//                    binding.instituteDescription.text.toString(),
//                    binding.instituteWalletId.text.toString(),
//                    callback
//                )
                val intent = Intent(this@InstituteSignUp, InstituteMint::class.java)
                overridePendingTransition(R.anim.slide_out, R.anim.slide_in)
                startActivity(intent)
            }
        }
    }
}

fun MaterialButton.setShowProgress(showProgress: Boolean?) {
    icon = if (showProgress == true) {
        CircularProgressDrawable(context!!).apply {
            setStyle(CircularProgressDrawable.DEFAULT)
            setColorSchemeColors(ContextCompat.getColor(context!!, android.R.color.white))
            start()
        }
    } else null
    if (icon != null) { // callback to redraw button icon
        this.isClickable = false
        icon.callback = object : Drawable.Callback {
            override fun unscheduleDrawable(who: Drawable, what: Runnable) {
            }

            override fun invalidateDrawable(who: Drawable) {
                this@setShowProgress.invalidate()
            }

            override fun scheduleDrawable(who: Drawable, what: Runnable, `when`: Long) {
            }
        }
    }else {
        this.isClickable = true
    }
}