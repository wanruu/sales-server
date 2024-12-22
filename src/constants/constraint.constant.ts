export enum UniqueConstraint {
    UniqueUser = 'uq_user',
    UniqueInvoice = 'uq_invoice',
    UniquePartner = 'uq_partner',
    UniqueProduct = 'uq_product',
}

export enum ForeignKeyConstraint {
    ForeignKeyPartner = 'fk_partner',
    ForeignKeyProduct = 'fk_product',
    ForeignKeyInvoice = 'fk_invoice',
    ForeignKeyOrder = 'fk_order',
    ForeignKeyUser = 'fk_user',
    ForeignKeyOrderItem = 'fk_order_item',
}

export const Constraint = {
    ...UniqueConstraint,
    ...ForeignKeyConstraint,
};
