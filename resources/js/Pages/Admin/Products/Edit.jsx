import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import FileInput from '@/Components/FileInput';
import { useCallback, useEffect } from 'react';

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
    product,
    categories,
    product_categories,
}) {


    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: product.name,
        description: product.description,
        main_image: null,
        categories: [...product_categories],
        image1: null,
        image2: null,
        image3: null,
    });
    const createProduct = (e) => {
        e.preventDefault();
        put(route('admin.products.update', { id: product.id }), {
            onSuccess: () => reset(),
        });
    };

    const handleCategories = (e) => {
        let val = +e.target.value;
        if (e.target.checked) {
            setData('categories', [...data.categories, val]);
        } else {
            setData(
                'categories',
                data.categories.filter((item) => {
                    return item !== val;
                })
            );
        }
    };

    useEffect(()=>{
        let categoriesElements = document.querySelectorAll('.categories');
        categoriesElements.forEach(item => {
            if(product_categories.indexOf(+item.value)>=0){
                item.checked = true;
            }
            
        })
        
    },[])

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products" />
            <div className="mx-auto mt-4 w-1/2">
                <form onSubmit={createProduct} className="mt-6 space-y-6">
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                    />
                    <br />
                    <TextArea
                        id="description"
                        value={data.description || ''}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <br />
                    <input
                        type="file"
                        className="w-full px-4 py-2"
                        label="Main Image"
                        name="main_image"
                        onChange={(e) =>
                            setData('main_image', e.target.files[0])
                        }
                    />
                    <br />
                    {product.main_image}
                    <br />
                    <h2>Categories</h2>
                    <div>
                        {categories.map((category) => {
                            return (
                                <div key={category.id}>
                                    <Checkbox
                                        id={`category_${category.id}`}
                                        className="categories"
                                        value={category.id}
                                        onChange={handleCategories}                                        
                                    />
                                    <label htmlFor={`category_${category.id}`}>
                                        {category.name}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <br />
                    <h2>Additional Images</h2>
                    <div className="my-2">
                        <label className="inline">Image 1</label>
                        <input
                            type="file"
                            className="inline ml-2"
                            label="Image 1"
                            name="image1"
                            onChange={(e) => {
                                setData('image1', e.target.files[0]);
                                console.log(e.target.files);
                            }}
                        />
                    </div>
                    <div className="my-2">
                        <label className="inline">Image 2</label>
                        <input
                            type="file"
                            className="ml-2"
                            label="Image 2"
                            name="image2"
                            onChange={(e) => {
                                setData('image2', e.target.files[0]);
                                console.log(e.target.files);
                            }}
                        />
                    </div>
                    <div className="my-2">
                        <label className="inline">Image 3</label>
                        <input
                            type="file"
                            className="ml-2"
                            label="Image 3"
                            name="image3"
                            onChange={(e) => {
                                setData('image3', e.target.files[0]);
                                console.log(e.target.files);
                            }}
                        />
                    </div>
                    <br />
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <br />
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
