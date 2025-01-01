export enum InvoiceType {
    SalesOrder,
    PurchaseOrder,
    SalesRefund,
    PurchaseRefund,
}

export function isOrderType(type: InvoiceType): boolean {
    return (
        type === InvoiceType.SalesOrder || type === InvoiceType.PurchaseOrder
    );
}

export function isRefundType(type: InvoiceType): boolean {
    return (
        type === InvoiceType.SalesRefund || type === InvoiceType.PurchaseRefund
    );
}

export enum DeliveryStatus {
    NotDelivered,
    Delivered,
    PartiallyDelivered,
}
