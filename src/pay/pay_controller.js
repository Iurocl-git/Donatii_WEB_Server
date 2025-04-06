const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentHandler = async (req, res) => {
    const { amount, currency } = req.body;
    try {
        // Создаем объект Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Сумма в центах (например, $10.00 = 1000)
            currency, // Валюта (например, "usd")
            payment_method_types: ["card"], // Типы поддерживаемых платежей
        });
        // console.log('paymentIntent');


        res.status(200).send({
            clientSecret: paymentIntent.client_secret, // Возвращаем client_secret для клиента
        });
    } catch (error) {
        console.error("Ошибка создания Payment Intent:", error);
        res.status(500).send({ error: error.message });
    }
};

const subscriptionHandler = async (req, res) => {
    const { paymentMethodId, customerName, customerEmail, priceId } = req.body;

    try {
        // 1. Создаём клиента в Stripe
        const customer = await stripe.customers.create({
            payment_method: paymentMethodId, // Привязываем метод оплаты
            email: customerEmail,
            name: customerName,
            invoice_settings: {
                default_payment_method: paymentMethodId, // Устанавливаем метод оплаты по умолчанию
            },
        });
        console.log("test");

        // 2. Создаём подписку для клиента
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }], // Указываем ID плана (цены) из Stripe Dashboard
            expand: ["latest_invoice.payment_intent"], // Расширяем для получения данных об оплате
        });

        // 3. Проверяем статус платежа
        const paymentIntent = subscription.latest_invoice.payment_intent;
        const status = paymentIntent.status;

        // Если требуется подтверждение, возвращаем client_secret
        if (status === "requires_action") {
            res.send({
                clientSecret: paymentIntent.client_secret,
                status,
            });
        } else {
            // Успешно завершена подписка
            res.send({ status: "success", subscriptionId: subscription.id });
        }
    } catch (error) {
        console.error("Ошибка создания подписки:", error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    paymentHandler,
    subscriptionHandler
}