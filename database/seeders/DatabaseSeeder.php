<?php

namespace Database\Seeders;

use App\Models\ProductCategories;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\Products::factory(100000)->create()
            ->each(function($product){
                ProductCategories::create([
                    'product_id'=>$product->id,
                    'category_id'=>2
                ]);
                ProductCategories::create([
                    'product_id'=>$product->id,
                    'category_id'=>rand(3,4)
                ]);
            })
            ;

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
