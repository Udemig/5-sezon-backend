import Order from "@/app/api/models/Order";
import connectMongo from "@/app/api/utils/connectMongo";
import { IOrder } from "@/app/api/models/Order";
import { ICar } from "@/app/api/models/Car";
import { FC } from "react";
import OrderCard from "@/app/components/card/order-card";

// Iorder'da product veri tipi ObjectId ama server actions'da product'ı populate ettiğimiz için objectId yerine bütün araç veirlierni aldık buyüzden tipi güncelledik
export type PopulatedOrder = IOrder & {
  product: ICar;
};

const Page: FC = async () => {
  // server actions ile veritbanına doğrudan client tarafından erişicez
  const getOrders = async (): Promise<PopulatedOrder[]> => {
    "use server";
    await connectMongo();
    return await Order.find().populate("product");
  };

  const orders = await getOrders();

  return (
    <div className="px-7 py-7 lg:px-10 text-black">
      <h1 className="mb-10 text-4xl font-bold">Siparişlerim</h1>

      <div className="grid gap-10">
        {orders?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Page;
