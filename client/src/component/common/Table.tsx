import { Table, Pagination } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface AnimatedTableProps {
    loading: boolean;
    data: any[];
    columns: any[];
    pageSize?: number;
    className?: string;
}

const AnimatedRow = ({ children, ...props }: any) => (

    <motion.tr
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        {...props}
    >
        {children}
    </motion.tr>
);

const CustomTable = ({
    loading,
    data,
    columns,
    pageSize = 2,
    className = '',
}: AnimatedTableProps) => {
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const currentData = data.slice(startIdx, endIdx);

    return (
        <Table
            dataSource={currentData}
            columns={columns}
            rowKey="_id"
            loading={loading}
            size="small"
            sortDirections={['ascend', 'descend', 'ascend']}
            scroll={{ x: 55 * 5 }}
            pagination={false}
            footer={() => {
                return (
                    <div className="gap-2 flex justify-center items-baseline">
                        <motion.span
                            className={`text-center ${darkMode ? 'text-white' : 'text-gray-600 '} text-sm  mx-2 p-2 rounded-md`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Showing <b>{currentData.length}</b> of <b>{data.length}</b> results
                        </motion.span>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={data.length}
                            onChange={(page) => setCurrentPage(page)}
                            showSizeChanger={false}
                        />
                    </div>
                );
            }}
            components={{
                body: {
                    row: AnimatedRow,
                },
            }}
        />
    );
};

export default CustomTable;
