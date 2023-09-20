<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    
    public function categories(){
        return $this->hasMany(ProductCategories::class, 'product_id', 'id');
    }
    
    public function images(){
        return $this->hasMany(ProductImages::class, 'product_id', 'id');
    }
}
