package com.bitlogger.web3resume

import android.app.DatePickerDialog
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import com.bitlogger.web3resume.databinding.ActivityInstituteMintBinding
import com.google.android.material.textfield.TextInputEditText
import java.util.*

class InstituteMint : AppCompatActivity() {
    lateinit var binding: ActivityInstituteMintBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInstituteMintBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.userEndDate.setOnClickListener {
            openDatePicker(it as TextInputEditText)
        }
        binding.userStartDate.setOnClickListener {
            openDatePicker(it as TextInputEditText)
        }
        binding.userExpiryDate.setOnClickListener {
            openDatePicker(it as TextInputEditText)
        }
        binding.userExpiry.setOnCheckedChangeListener { compoundButton, value ->
            if (value){
                binding.dd.visibility  = View.VISIBLE
            }else {
                binding.dd.visibility  = View.GONE
            }
        }

        val callback = object :BlockCallback {
            override fun isLoading(boolean: Boolean) {
                runOnUiThread{
                    binding.userMint.setShowProgress(boolean)
                }
            }

            override fun success(data: Any?) {
                val intent = Intent(this@InstituteMint, InstituteMint::class.java)
                overridePendingTransition(R.anim.slide_out, R.anim.slide_in)
                startActivity(intent)
            }

            override fun error(message: String) {
                runOnUiThread {
                    Toast.makeText(this@InstituteMint, message, Toast.LENGTH_SHORT).show()
                }
            }
        }

        binding.userMint.setOnClickListener {
            if (binding.userWallet.text.toString().isEmpty()) {
                binding.userWallet.error = "Enter Name"
                return@setOnClickListener
            }else if (binding.userExpType.text.toString().isEmpty()) {
                binding.userExpType.error = "Enter Experience"
                return@setOnClickListener
            }else if (binding.userTitle.text.toString().isEmpty()) {
                binding.userTitle.error = "Enter Title"
                return@setOnClickListener
            }else if (binding.userDescription.text.toString().isEmpty()) {
                binding.userDescription.error = "Enter Desc"
                return@setOnClickListener
            }else if (binding.userStartDate.text.toString().isEmpty()) {
                binding.userStartDate.error = "Enter Start Date"
                return@setOnClickListener
            }else if (binding.userEndDate.text.toString().isEmpty()) {
                binding.userEndDate.error = "Enter End Date"
                return@setOnClickListener
            }else {
                ContractBuilder().mintUser(
                    binding.userWallet.text.toString(),
                    binding.userExpType.text.toString(),
                    binding.userTitle.text.toString(),
                    binding.userDescription.text.toString(),
                    binding.userStartDate.text.toString(),
                    binding.userEndDate.text.toString(),
                    callback
                )
            }
        }
    }

    private fun openDatePicker(editText: TextInputEditText) {
        val c = Calendar.getInstance()

        // on below line we are getting
        // our day, month and year.
        val year = c.get(Calendar.YEAR)
        val month = c.get(Calendar.MONTH)
        val day = c.get(Calendar.DAY_OF_MONTH)

        // on below line we are creating a
        // variable for date picker dialog.
        val datePickerDialog = DatePickerDialog(
            // on below line we are passing context.
            this,
            { view, year, monthOfYear, dayOfMonth ->
                // on below line we are setting
                // date to our edit text.
                val dat = (dayOfMonth.toString() + "-" + (monthOfYear + 1) + "-" + year)
                editText.setText(dat)
            },
            // on below line we are passing year, month
            // and day for the selected date in our date picker.
            year,
            month,
            day
        )
        // at last we are calling show
        // to display our date picker dialog.
        datePickerDialog.show()
    }
}