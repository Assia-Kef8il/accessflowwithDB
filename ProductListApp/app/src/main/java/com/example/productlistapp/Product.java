package com.example.productlistapp;

public class Product {

    private String name;
    private String price;
    private int image;
    private String description;
    private String link;

    public Product(String name, String price, int image,
                   String description, String link) {

        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.link = link;
    }

    public String getName() {
        return name;
    }

    public String getPrice() {
        return price;
    }

    public int getImage() {
        return image;
    }

    public String getDescription() {
        return description;
    }

    public String getLink() {
        return link;
    }
}