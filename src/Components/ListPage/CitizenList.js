import React, { Component } from 'react';
import DataTable from '../Table/DataTable';

export default class CitizenList extends Component{

  


    render(){  
        const headings = [
        'Product name',
        'SKU',
        'Stock quantity',
        'Wholesale cost',
        'Sale price',
        'Quantity sold',
        'Gross sales',
        'Net sales',
        'Notes',
      ];

      const rows = [
        [
          'Red and black plaid scarf with thin red stripes and thick black stripes',
          124689325,
          28,
          '$35.00',
          '$60.00',
          12,
          '$720.00',
          '$300.00',
          '',
        ],
        [
          'Yellow plaid scarf',
          124689389,
          0,
          '$35.00',
          '$60.00',
          20,
          '$1200.00',
          '$500.00',
          'Currently on back order by the supplier. Do not place another order to restock.',
        ] ];
        return(

          <DataTable headings={headings} rows={rows} />
        );
    }
}