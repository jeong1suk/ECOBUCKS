import { orderService } from "../services/order-service.js";
import { validateEmptyBody } from "../utils/validators.js";
import { userAuthService } from "../services/user-service.js";
import { productService } from "../services/product-service.js";

const orderPostCreate = async function(req, res, next) {
    try{
        validateEmptyBody(req)
        const { productId } = req.body;
        const buyer = req.currentUserId;

        const { username: buyerName } = await userAuthService.getUserInfo({ userId: buyer });
        const { name: productName } = await productService.findProduct({ productId });
        const newOrder = await orderService.addOrder({ productId, productName, buyer, buyerName })
        
        if (newOrder.errorMessage) {
            throw new Error(newOrder.errorMessage);
        }
      
        return res.status(201).json(newOrder);
    } catch (error) {
    next(error);
    }
}

const orderGetMypage = async function(req, res, next) {
    try {
        const userId = req.currentUserId;
        const orders = await orderService.getUserOrders({ userId });

        if (orders.length === 0) {
            return res.json({ message: '주문 내역이 없습니다.' });
        }

        const orderDetails = [];

        for (const order of orders) {
            const { productId } = order;
            const { name, price, place } = await productService.findProduct({ productId });
            
            orderDetails.push({
                createdAt: order.createdAt,
                name,
                price,
                place,
            });
        }
        
        return res.json(orderDetails);
    } catch (error) {
        next(error);
    }
}

export { orderPostCreate, orderGetMypage };