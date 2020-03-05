function ColumnGenerator(obj) {
    return Object.keys(obj).map(key => ({ Header: key, accessor: key }));
}

export default ColumnGenerator;