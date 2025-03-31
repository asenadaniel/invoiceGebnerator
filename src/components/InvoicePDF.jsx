import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format, parseISO } from "date-fns";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, color: '#333' },
  section: { marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  table: { display: 'table', width: '100%', borderStyle: 'solid', borderWidth: 1, marginTop: 10 },
  tableRow: { flexDirection: 'row' },
  tableCellHeader: { padding: 5, fontWeight: 'bold', borderStyle: 'solid', borderWidth: 1, flex: 1 },
  tableCell: { padding: 5, borderStyle: 'solid', borderWidth: 1, flex: 1 },
  footer: { backgroundColor: '#1e293b', padding: 10, color: 'white', textAlign: 'right', fontSize: 14, marginTop: 10 }
});

const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>INVOICE #{invoice.id}</Text>
        <Text style={styles.text}>Invoice Date: {format(parseISO(invoice.invoiceDate), 'dd-MMM-yyyy')}</Text>
        <Text style={styles.text}>Payment Due: {format(parseISO(invoice.dueDate), 'dd-MMM-yyyy')}</Text>
        <Text style={styles.text} >Status: {invoice.status}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Bill From: {invoice.billFrom.country}</Text>
        <Text style={styles.text}>{invoice.billFrom.streetAddress}</Text>
        <Text style={styles.text}>{invoice.billFrom.city}, {invoice.billFrom.postCode}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Bill to: {invoice.clientName}</Text>
        <Text style={styles.text}>{invoice.billTo.streetAddress}</Text>
        <Text style={styles.text}>{invoice.billTo.clientEmail}</Text>
        <Text style={styles.text}>{invoice.billTo.city}, {invoice.billTo.postCode}, {invoice.billTo.country}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Item Name</Text>
          <Text style={styles.tableCellHeader}>Quantity</Text>
          <Text style={styles.tableCellHeader}>Price</Text>
          <Text style={styles.tableCellHeader}>Total</Text>
        </View>
        {invoice.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>USD{item.price.toFixed(2)}</Text>
            <Text style={styles.tableCell}>USD{item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Text>Amount Due: USD {invoice.amount.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);
export default InvoicePDF;
