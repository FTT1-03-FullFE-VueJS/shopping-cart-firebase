export default function LocalStorage(key) {
    const set = value => {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    const get = (_default = null) => {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return _default;
    }
    const remove = () => {
        localStorage.removeItem(key);
    }

    return {
        set,
        get,
        remove,
    };
};
/**
 * - Arrow function được viết ngắn gọn hơn regular function
 * - Arrow function có thể trả về trực tiếp giá trị mà ko cần ký hiệu return
 * - Arrow function ko có đối tượng this của riêng nó
 * - Arrow function ko hosting
 */
// function myName() {
//     return 'My name is Nhan';
// }
// const myName2 = () => 'My name is Nhan';

// console.log(myName());
// console.log(myName2());

// function User() {
//     const name = 'hung';
//     const age = 21;

//     console.log(this);
// }

// User();
