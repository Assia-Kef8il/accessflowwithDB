package com.example.productlistapp;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class ProductAdapter extends RecyclerView.Adapter<ProductAdapter.ViewHolder> {

    public interface OnProductClickListener {
        void onProductClick(Product product, int position);
    }

    private Context context;
    private List<Product> list;
    private OnProductClickListener listener;

    public ProductAdapter(Context context, List<Product> list,
                          OnProductClickListener listener) {
        this.context = context;
        this.list = list;
        this.listener = listener;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView image;
        TextView name;

        public ViewHolder(View itemView) {
            super(itemView);
            image = itemView.findViewById(R.id.imgProduct);
            name = itemView.findViewById(R.id.txtName);
        }
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context)
                .inflate(R.layout.item_product, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Product product = list.get(position);

        holder.name.setText(product.getName());
        holder.image.setImageResource(product.getImage());

        // animation
        holder.itemView.startAnimation(
                AnimationUtils.loadAnimation(context, R.anim.item_anim));

        // long press → Toast price
        holder.itemView.setOnLongClickListener(v -> {
            Intent intent = new Intent(context, ProductDetailActivity.class);
            intent.putExtra("name", product.getName());
            intent.putExtra("price", product.getPrice());
            intent.putExtra("image", product.getImage());
            intent.putExtra("description", product.getDescription());
            intent.putExtra("link", product.getLink());
            context.startActivity(intent);
            return true;
        });


    }

    @Override
    public int getItemCount() {
        return list.size();
    }
}