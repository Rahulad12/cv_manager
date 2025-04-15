import { Button, Card, Col, Form, Input, Row, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
const AssessmentForm = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className=' p-4'
        >
            <Card
                title="Assessment Form"
                className='bg-white rounded-xl shadow-md w-full max-w-3xl'
            >
                <Form
                    onFinish={onFinish}
                    layout='vertical'
                    autoComplete='off'
                >
                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Form.Item
                                    name="assessment"
                                    label="Assessment"
                                    rules={[{ required: true, message: "Assessment Name is Required" }]}
                                >
                                    <Input size='large' placeholder='Assessment' />
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col xs={24} md={12}>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Form.Item
                                    name="type"
                                    label="Type"
                                    rules={[{ required: true, message: "Type is Required" }]}
                                >
                                    <Select size='large' placeholder='Select Type' allowClear>
                                        <Select.Option value="type">Type</Select.Option>
                                    </Select>
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col xs={24} md={12}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Form.Item
                                    name="technology"
                                    label="Technology"
                                    rules={[{ required: true, message: "Technology is Required" }]}
                                >
                                    <Select size='large' placeholder='Select Technology' allowClear>
                                        <Select.Option value="react js">React Js</Select.Option>
                                    </Select>
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col xs={24} md={12}>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Form.Item
                                    name="level"
                                    label="Level"
                                    rules={[{ required: true, message: "Level is Required" }]}
                                >
                                    <Select size='large' placeholder='Select Level' allowClear>
                                        <Select.Option value="junior">Junior</Select.Option>
                                        <Select.Option value="mid">Mid</Select.Option>
                                        <Select.Option value="senior">Senior</Select.Option>
                                    </Select>
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col xs={24} md={12}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Form.Item
                                    name="file"
                                    label="Assessment File"
                                    rules={[{ required: true, message: "Assessment File is Required" }]}
                                >
                                    <Upload maxCount={1} beforeUpload={() => false}>
                                        <Button icon={<UploadOutlined />}>Upload File</Button>
                                    </Upload>
                                </Form.Item>
                            </motion.div>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Col span={12}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            > <Button type="primary" htmlType="submit">
                                    Save Assessment
                                </Button></motion.div>
                        </Col>
                    </Form.Item>
                </Form>
            </Card>
        </motion.div>
    )
}

export default AssessmentForm
