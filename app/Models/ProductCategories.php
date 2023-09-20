<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategories extends Model {

    use HasFactory;

    public $timestamps = false;
    protected $table = 'product_categories';
    protected $fillable = ['product_id', 'category_id'];
    protected $primaryKey = ['product_id', 'category_id'];
    public $incrementing = false;
}
