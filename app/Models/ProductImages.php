<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImages extends Model {

    use HasFactory;

    public $timestamps = false;
    protected $table = 'product_images';
    protected $fillable = ['product_id', 'image'];
}
