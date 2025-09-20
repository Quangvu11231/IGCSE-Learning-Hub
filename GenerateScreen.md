Bạn đang làm việc trong một dự án React có cấu trúc chuẩn sau:

- Các trang (screen) nằm trong thư mục `src/modules/pages`.
- Mỗi screen được đặt trong một folder riêng, ví dụ: `UserList/`, `Dashboard/`, ...
- Mỗi folder screen phải chứa 2 file:

  - `ScreenName.tsx`: là component React chính (ví dụ: `UserList.tsx`)
  - `index.ts`: export mặc định screen, ví dụ:
    export { default as UserList } from './UserList';

- Tất cả các screen được re-export thông qua `src/pages/index.ts` để dễ import vào hệ thống route.
- File định nghĩa route chính là `src/routers/index.tsx`, sử dụng react-router-dom v6.
- App có 2 layout:

  - `AuthLayout` cho login/register
  - `MainLayout` cho các trang chính (dashboard, profile, ...)

- Các route trong `MainLayout` đều được bảo vệ bằng component `<PrivateRoute>`.

🔧 Khi tôi yêu cầu "tạo screen X", bạn cần thực hiện các bước sau:

1. Tạo folder `X` trong `src/modules/pages/`
2. Tạo file `X.tsx` với component React có tên `X`
3. Tạo file `index.ts` để export component đó
4. Thêm export của X vào `src/pages/index.ts`
5. Thêm route mới vào `AppRoutes.tsx` trong layout chính (`MainLayout`), sử dụng `<PrivateRoute>`
6. (Nếu cần) Thêm mục tương ứng vào cấu hình sidebar điều hướng

Hãy đảm bảo tên file, tên component và route path khớp nhau.

Tôi sẽ cung cấp tên màn hình, bạn sẽ tạo đúng theo quy chuẩn trên.
