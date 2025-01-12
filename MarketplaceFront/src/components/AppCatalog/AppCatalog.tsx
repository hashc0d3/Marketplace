import React, {useEffect, useState} from 'react';
import './AppCatalog.css';

export interface Product {
    title: string;
    description: string;
    price: number;
    fullDescription?: string;
}

const AppCatalog = () => {

    const [catalog, setCatalog] = useState<Product[]>();
    const [error, setError] = useState();
    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/catalog')
                if (!response.ok) {
                    throw new Error('Не удалось загрузить каталог');
                }
                const data = await response.json();
                setCatalog(data);
            } catch (error: any) {
                setError(error.message);
            }
        }
        fetchCatalog();
    }, []);

    const [openItem, setOpenItem] = useState<boolean>(false);
    const [catalogItem, setCatalogItem] = useState<Product>();
    const [errorItem, setErrorItem] = useState();

    const handleOnClickItem = (index: number) => {
        const fetchCatalog = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/catalog/${index}`)
                if (!response.ok) {
                    throw new Error('Не удалось загрузить каталог');
                }
                const data = await response.json();
                setOpenItem(true);
                setCatalogItem(data);
            } catch (error: any) {
                setErrorItem(error.message);
            }
        }
        fetchCatalog();
    }

    return (
        <section className="catalog">
            <section className="catalog__title">
                <h1>MARKETPLACE</h1>
            </section>
            <section className={'catalog__body'}>
                {catalog?.map((item, index) =>
                    <section key={index} className={"catalog__body__items"} onClick={() => handleOnClickItem(index)}>
                        <h1>{item.title}</h1>
                        <h1>{item.description}</h1>
                        <h1>{item.price}</h1>
                    </section>
                )}
            </section>
            {(catalogItem && openItem) && (
                <section className={'catalog__body__item'} onClick={() => setOpenItem(false)}>
                    <h1>{catalogItem.title}</h1>
                    <h1>{catalogItem.fullDescription}</h1>
                    <h1>{catalogItem.price}</h1>
                </section>
            )}
        </section>
    );
};

export default AppCatalog;