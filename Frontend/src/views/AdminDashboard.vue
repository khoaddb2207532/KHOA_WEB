<template>
    <b-container>
        <h1 class="my-4">👨‍💼 Trang Quản trị Admin</h1>
        <b-row>
            <b-col>
                <b-card title="Duyệt yêu cầu mượn sách" to="/admin/borrow-requests"></b-card>
            </b-col>
            <b-col>
                <b-card title="Thống kê sách mượn nhiều nhất" to="/statistics/top-books"></b-card>
            </b-col>
        </b-row>
    </b-container>
</template>
