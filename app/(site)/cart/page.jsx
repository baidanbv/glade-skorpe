'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DOMPurify from 'dompurify';

import { AnimatePresence } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';

import { useCartStore, usePopup } from '@/store';
import { ordersAPI } from '@/api';

import Title from '@/components/ui/Title/Title';
import Button from '@/components/ui/Buttons/Button';
import ModalPopup from '@/components/ui/ModalPopup/ModalPopup';
import AcceptMessage from '@/components/ui/AcceptMessage/AcceptMessage';
import SuccessMessage from '@/components/ui/SuccessMessage/SuccessMessage';

const page = () => {
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [productToTrash, setProductToTrash] = useState(null);
  const [isSuccesOrder, setSuccesOrder] = useState(false);

  const { openDeletePopup, deleteFormModal, closeDeletePopup } = usePopup();
  const cartItems = useCartStore((state) => state.cartItems);
  const loadCartItems = useCartStore((state) => state.loadCartItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.amount, 0);

  const closePopup = () => {
    setSuccesOrder(false);
    router.push('/');
  };

  const sanitizeComment = (comment) => {
    return DOMPurify.sanitize(comment);
  };

  const handleIncrease = (product) => {
    increaseQuantity(product.id, product.size);
  };

  const handleDecrease = (product) => {
    decreaseQuantity(product.id, product.size);
  };

  const removeProductFromCart = (item) => {
    removeFromCart(item);
    closeDeletePopup();
  };

  const getCurrentProduct = (product) => {
    setProductToTrash(product);
    openDeletePopup();
  };

  const handleSubmitOrder = async () => {
    try {
      const order = {
        dishes: cartItems.map((item) => ({
          dish: item.id,
          amount: item.amount,
          size: item.size || 'normal',
          extraIngredients: item.extraIngredients || []
        })),
        comment: sanitizeComment(comment),
        totalPrice: totalPrice
      };

      await ordersAPI.createOrder(order);
      setSuccesOrder(true);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  useEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  return (
    <>
      <div className="pt-10 pb-7 flex flex-col gap-7 lg:flex-row lg:flex-wrap lg:justify-between lg:items-end lg:container lg:mx-auto">
        {cartItems.length > 0 ? (
          <>
            <Title title="Bestilling" />
            <div className="flex flex-col gap-7 sm:w-4/5 sm:mx-auto md:w-3/5 lg:w-1/3">
              {cartItems.map((product) => (
                <div key={`${product.id}_${product.price}`} className="bg-[#D9D9D9] drop-shadow py-5 px-4 relative">
                  <FaTrash className="absolute bottom-2 right-2 cursor-pointer text-accent hover:text-red-500" title="fjern" onClick={() => getCurrentProduct(product)} />
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg uppercase leading-none  font-kurale flex flex-col items-center justify-center w-14">
                      <IoIosArrowUp onClick={() => handleIncrease(product)} className="lg:cursor-pointer lg:hover:text-red-500" />
                      <span>{product.amount} X</span>
                      <IoIosArrowDown onClick={() => handleDecrease(product)} className="lg:cursor-pointer lg:hover:text-red-500" />
                    </div>

                    <img src={product.image} alt={product.title} className="w-8 h-auto" />

                    <h5 className="text-lg uppercase leading-none  font-kurale lg:text-sm">{product.title}</h5>
                  </div>

                  {product.extraIngredients && product.extraIngredients.length > 0 && (
                    <div className="flex flex-wrap items-start justify-between px-5 mb-5 lg:px-4 text-right">
                      <span className="font-kurale border-b border-primary">Extra:</span>
                      <ul>
                        {product.extraIngredients.map((ingredient) => (
                          <li>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.size && (
                    <div className="flex justify-between px-5 mb-5 lg:px-4">
                      <span className="font-kurale border-b border-primary ">Størrelse:</span>
                      <span>{product.size === 'normal' ? 'Almindelig' : 'Familie'}</span>
                    </div>
                  )}

                  <div className="flex justify-between px-14 mb-5">
                    <span className="font-kurale border-b border-primary">Pris:</span>
                    <span>{product.price},-</span>
                  </div>
                </div>
              ))}
              <div className="font-kurale text-lg text-center ">
                I alt: <span>{totalPrice},-</span>
              </div>
            </div>

            <div className="flex flex-col gap-7 sm:w-4/5 sm:mx-auto md:w-3/5 lg:w-2/4">
              <textarea className="border border-primary drop-shadow py-2 px-2 w-11/12 min-h-28 block mx-auto outline-none" placeholder="Kommentarer til ordren" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
              <Button title="Afgiv ordre" type="submit" py="py-2" px="px-16" onClick={handleSubmitOrder} />
            </div>
          </>
        ) : (
          <p className="text-center px-4">
            Din indkøbskurv er tom. Du kan flytte til
            <Link href="/" className="text-xl mx-2 font-kurale text-background">
              Hjemmesiden
            </Link>
            og foretage din første ordre
          </p>
        )}
      </div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {isSuccesOrder && (
          <ModalPopup handlePopup={closePopup} isSuccessMessage={true}>
            <SuccessMessage message="Tak for din bestilling!" />
          </ModalPopup>
        )}

        {deleteFormModal && (
          <ModalPopup handlePopup={closeDeletePopup}>
            <AcceptMessage
              message="Er du sikker på, at du vil slette dette produkt fra kurven?"
              acceptButton={() => {
                removeProductFromCart(productToTrash);
              }}
              cancelButton={closeDeletePopup}
            />
          </ModalPopup>
        )}
      </AnimatePresence>
    </>
  );
};

export default page;
