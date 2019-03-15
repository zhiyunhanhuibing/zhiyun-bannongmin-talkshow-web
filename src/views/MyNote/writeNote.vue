<template>
    <div class="texts">
    <el-form label-width="50px">
      <el-form-item label="用户:">
        <input v-model="article_title" placeholder="笔记标题" style="width:580px"></input>
      </el-form-item>
        <div ref="editor" style="text-align:left"></div>
        <center>
        <el-button type="primary" @click="AppendPopupSure">
          发表笔记
        </el-button>
        <el-button type="primary" class="fa fa-paint-brush" aria-hidden="true" @click="toWriteNote">
          返回文章列表
        </el-button>
        <el-button type="primary" class="fa fa-paint-brush" aria-hidden="true" @click="toMyBlog">
            我的博客
        </el-button>
        </center>
      </el-form>
    </div>
    
</template>

<script>
    import E from 'wangeditor'
    import axios from '@/views/MyNote/writeNote';
    export default {
      name: 'editor',
      data () {
        return {
          article_title:'',
          editorContent: '',
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        },
        AppendPopupSure() {
          let saveParam = {};
          saveParam.article_title=this.article_title,
          saveParam.article_content=this.editorContent
          axios.systemAdd(saveParam).then((res) => {
              this.currentPage = res.data.currentPage;
              this.totalPage = res.data.totalNum;
              this.search();
          }).catch((err) =>{
              console.log(err);
          })
        },
        //跳转至写笔记界面
			toWriteNote: function () {
				var _this = this;
				_this.$router.push('/myNote');
			},
        //跳转至博客页
			toMyBlog: function () {
				var _this = this;
				_this.$router.push('/myBlog');
			},
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
    }
</script>

<style>
  .texts .el-form-item{
    margin-bottom: 0px;
  }

  
</style>