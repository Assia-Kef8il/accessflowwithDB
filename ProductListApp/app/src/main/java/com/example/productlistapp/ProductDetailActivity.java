package com.example.productlistapp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class ProductDetailActivity extends AppCompatActivity {

    ImageView image;
    TextView name, description, selectedPrice, link;

    RadioGroup priceOptions;
    RadioButton priceWithout, priceWith;

    String basePrice;
    String productLink;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_detail);

        image = findViewById(R.id.detailImage);
        name = findViewById(R.id.detailName);
        description = findViewById(R.id.detailDescription);
        selectedPrice = findViewById(R.id.selectedPrice);
        link = findViewById(R.id.productLink);

        priceOptions = findViewById(R.id.priceOptions);
        priceWithout = findViewById(R.id.priceWithout);
        priceWith = findViewById(R.id.priceWith);

        Intent intent = getIntent();

        String productName = intent.getStringExtra("name");
        basePrice = intent.getStringExtra("price");
        int productImage = intent.getIntExtra("image", 0);
        String productDescription = intent.getStringExtra("description");
        productLink = intent.getStringExtra("link");

        name.setText(productName);
        image.setImageResource(productImage);
        description.setText(productDescription);

        selectedPrice.setText("Selected price: " + basePrice);

        priceOptions.setOnCheckedChangeListener((group, checkedId) -> {

            if (checkedId == R.id.priceWithout) {
                selectedPrice.setText("Selected price: " + basePrice);
            }

            if (checkedId == R.id.priceWith) {

                int price = Integer.parseInt(basePrice.replace("$",""));
                price += 50;

                selectedPrice.setText("Selected price: $" + price);
            }
        });

        link.setOnClickListener(v -> {

            Intent web = new Intent(Intent.ACTION_VIEW, Uri.parse(productLink));
            startActivity(web);

        });
    }
}