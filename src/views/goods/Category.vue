<template>
  <div>
    <!-- 面包屑 -->
    <breadcrumb level1="商品管理" level2="分类管理"></breadcrumb>
    <!-- 按钮  -->
    <template>
      <el-row>
        <el-button type="info" plain class="addCateBtn">添加分类</el-button>
      </el-row>
    </template>
    <!-- 表格 -->
    <template>
      <el-table
        :data="cateData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="cat_name"
          label="分类名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cat_level"
          label="级别"
          width="180">
          <!-- 判断  级别 -->
          <template slot-scope="scope">
            <p v-if="scope.row.cat_level === 0">一级</p>
            <p v-if="scope.row.cat_level === 1">二级</p>
            <p v-if="scope.row.cat_level === 2">三级</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cat_deleted"
          label="是否有效">
          <!-- 判断是否有效 -->
          <template slot-scope="scope">
            {{scope.row? '有效': '无效'}}
          </template>
        </el-table-column>
        <!-- 操作 -->
          <el-table-column
            label="操作">
                  <template slot-scope="scope">
                    <el-button plain size="mini" type="primary" icon="el-icon-edit" ></el-button>
                    <el-button plain size="mini" type="danger" icon="el-icon-delete" ></el-button>
                  </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <template>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateData: [],
      // 分页
      pagesize: 5,
      pagenum: 1,
      total: 50
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // const res = this.$http.get('categories?type=3');
      // &pagenum=${this.pagenum}&pagesize=${this.pagesize}
      const { data: resData } = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      console.log(resData.data.result);
      this.cateData = resData.data.result;
      this.total = resData.data.total;
    },
    // 每页得条数改变时
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 当前页改变时
    handleCurrentChange(val) {
      this.pagenum = val;
    }
  }
};
</script>

<style>
.addCateBtn {
  margin: 10px 0;
}
.block {
  margin: 10px 0;
}
</style>
