import React, { useEffect, useState } from "react";
import { Checkbox, Spin, message, Button } from 'antd';
import axios from "axios";

const SelectStudents = (props) => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [checkedList, setCheckedList] = useState([]);

    const fetchStudents = () => {
        return axios.get(`/api/classes/${props.classId}/studentsNotEnrolled`,
            { headers: { 'Content-Type': 'application/json' } })
            .then((response) => setStudents(response.data))
            .catch((err) => message.error(err));
    }

    useEffect(() => {
        fetchStudents().then(() => setLoading(false));
    }, []);

    const addStudentsToClass = () => {
        axios.post(`/api/classes/${props.classId}/students`, { students: checkedList })
            .then(() => {
                props.updateTable();
                fetchStudents().then(() => message.success('Students added successfully!'))
            })
            .catch((err) => message.error(err));
    }

    const onChange = (list) => {
        const item = list.target;

        if (!item.checked) {
            setCheckedList(checkedList.filter(id => id !== item.value));
            return;
        }

        setCheckedList([...checkedList, item.value]);
    };

    return (
        <div>
            {
                loading ?
                    <Spin size="large"/> :
                    <div id="select-students">
                        {
                            students.map(student => (
                                    <Checkbox defaultChecked={false} onChange={onChange} value={student._id}
                                              key={student._id}>
                                        {student.fullName} - {student.grade}
                                    </Checkbox>
                                )
                            )
                        }

                        <Button type="primary" htmlType="submit" onClick={addStudentsToClass}>
                            Add
                        </Button>
                    </div>
            }
        </div>
    );
}

export default SelectStudents;