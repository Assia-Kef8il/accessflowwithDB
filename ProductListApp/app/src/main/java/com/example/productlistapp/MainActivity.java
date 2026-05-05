package com.example.productlistapp;

import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;

    LinearLayout containerProducts;
    ArrayList<Product> productList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mediaPlayer = MediaPlayer.create(this, R.raw.music);
        mediaPlayer.start();

        containerProducts = findViewById(R.id.containerProducts);

        productList = new ArrayList<>();

        productList.add(new Product(
                "Phone",
                "$500",
                R.drawable.iphone,
                "Latest Android smartphone with high performance.",
                "https://www.samsung.com"
        ));

        productList.add(new Product(
                "Laptop",
                "$900",
                R.drawable.laptop,
                "High performance laptop for development and gaming.",
                "https://www.dell.com"
        ));

        productList.add(new Product(
                "Watch",
                "$200",
                R.drawable.watch,
                "Smartwatch with health tracking and notifications.",
                "https://www.apple.com/watch"
        ));

        displayProducts();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (mediaPlayer != null) {
            mediaPlayer.pause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (mediaPlayer != null) {
            mediaPlayer.start();
        }
    }

    private void displayProducts() {

        containerProducts.removeAllViews();
        LayoutInflater inflater = LayoutInflater.from(this);

        for (int i = 0; i < productList.size(); i++) {

            Product product = productList.get(i);
            int position = i;

            View itemView = inflater.inflate(R.layout.item_product, containerProducts, false);

            ImageView img = itemView.findViewById(R.id.imgProduct);
            TextView name = itemView.findViewById(R.id.txtName);

            img.setImageResource(product.getImage());
            name.setText(product.getName());

            // LONG CLICK → OPEN PRODUCT DETAIL
            img.setOnLongClickListener(v -> {

                Intent intent = new Intent(MainActivity.this, ProductDetailActivity.class);

                intent.putExtra("name", product.getName());
                intent.putExtra("price", product.getPrice());
                intent.putExtra("image", product.getImage());
                intent.putExtra("description", product.getDescription());
                intent.putExtra("link", product.getLink());

                startActivity(intent);

                return true;
            });

            // CLICK → replace with similar products
            img.setOnClickListener(v -> replaceWithSimilar(product, position));

            containerProducts.addView(itemView);
        }
    }

    private void replaceWithSimilar(Product product, int position) {

        ArrayList<Product> similar = new ArrayList<>();

        switch (product.getName()) {

            case "Phone":

                similar.add(new Product(
                        "iPhone",
                        "$600",
                        R.drawable.iphone,
                        "Apple smartphone with premium design.",
                        "https://www.apple.com/iphone"
                ));

                similar.add(new Product(
                        "Phone Case",
                        "$30",
                        R.drawable.phone_case,
                        "Protective case for smartphones.",
                        "https://www.amazon.com"
                ));

                similar.add(new Product(
                        "Pink Case",
                        "$25",
                        R.drawable.pink_case,
                        "Stylish pink phone protection case.",
                        "https://www.amazon.com"
                ));

                break;

            case "Watch":

                similar.add(new Product(
                        "Watch Charger",
                        "$20",
                        R.drawable.watch_cahrger,
                        "Magnetic charger for smartwatches.",
                        "https://www.amazon.com"
                ));

                similar.add(new Product(
                        "Watch Strap",
                        "$15",
                        R.drawable.watch_strap,
                        "Comfortable replacement strap.",
                        "https://www.amazon.com"
                ));

                similar.add(new Product(
                        "Pink Watch",
                        "$50",
                        R.drawable.pink_watch,
                        "Stylish pink smartwatch.",
                        "https://www.amazon.com"
                ));

                break;

            case "Laptop":

                similar.add(new Product(
                        "Pink Laptop",
                        "$800",
                        R.drawable.pink_lap,
                        "Lightweight stylish laptop.",
                        "https://www.hp.com"
                ));

                similar.add(new Product(
                        "Laptop Case",
                        "$40",
                        R.drawable.laptop_case,
                        "Protective laptop sleeve.",
                        "https://www.amazon.com"
                ));

                similar.add(new Product(
                        "Laptop Mac",
                        "$1000",
                        R.drawable.laptop_mac,
                        "Apple MacBook laptop.",
                        "https://www.apple.com/mac"
                ));

                break;
        }

        productList.remove(position);
        productList.addAll(position, similar);

        displayProducts();
    }
}