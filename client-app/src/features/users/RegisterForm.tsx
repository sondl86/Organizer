import { Formik, Form, ErrorMessage } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function RegisterForm(){
const {userStore} = useStore()

    return(
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
                setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Login to Appointments' color='purple' textAlign="center" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type="password"/>
                    <ErrorMessage 
                        name='error' render= {() => 
                        <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} color="purple" content="Login" type="submit" fluid/>
                </Form>
            )}
        </Formik>
    )
})