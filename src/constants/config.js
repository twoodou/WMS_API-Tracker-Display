export const config = {
  creds: {
    user: 'sa',
    password: 'ACCTivate!MSSQL',
    server: '192.168.50.9\\Acctivate',
    database: 'Acctivate$LIVE-JOHARTDESIGN',
    options: { encrypt: true },
    multipleStatements: true,
  },
  tables: {
    production: {
      table: {
        name: 'dbo.tbINVTransaction',
        columns: {
          guid: 'GUIDProductionWorkFlowStatus',
          workOrderNumber: 'RegNumber',
        },
      },
    },
    fulfillment: {
      table: {
        name: 'dbo.tbOrders',
        columns: {
          guidOrder: 'GUIDOrder',
          vNumber: 'OrderNumber',
          customerTypeID: 'GUIDCustomerType',
          orderType:'Type',
          orderDate: 'OrderDate',
          orderStatus: 'OrderStatus',
          customerID: 'GUIDCustomer',
          reference: 'Reference',
          shippingInstructions: 'ShippingInstructions',
          specialInstructions: 'SpecialInstructions',
          wfStatusID: 'GUIDOrderWorkFlowStatus',
          wfStatusUpdatedAt: 'WorkFlowStatusDate',
          wfStatusUpdatedBy: 'WorkFlowStatusChangedBy',
          updatedAt: 'UpdatedDate',
          updatedBy: 'UpdatedBy',
        },
      },
    },
  }
};
